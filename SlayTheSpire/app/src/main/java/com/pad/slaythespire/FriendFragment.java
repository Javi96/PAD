package com.pad.slaythespire;


import android.app.AlertDialog;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import java.util.ArrayList;


/**
 * A simple {@link Fragment} subclass.
 */
public class FriendFragment extends Fragment {


    RecyclerView recyclerView;

    public FriendFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_friend, container, false);
        recyclerView = view.findViewById(R.id.recycle_view_friends);
        recyclerView.setLayoutManager(new GridLayoutManager(this.getActivity(), 2));

        final ArrayList<String> dataList = new ArrayList<>();
        for (int i=0; i<4; i++){
            dataList.add("Dato:" + i);
        }

        final FriendAdapter friendAdapter = new FriendAdapter(dataList);
        friendAdapter.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(), "Selected " +
                        dataList.get(recyclerView.getChildAdapterPosition(v)), Toast.LENGTH_LONG).show();
                //startActivity(new Intent(getActivity(), FriendRequestActivity.class));
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                View newView = getLayoutInflater().inflate(R.layout.activity_friend_request,null);
                builder.setView(newView);
                AlertDialog alertDialog = builder.create();
                alertDialog.show();
            }
        });

        recyclerView.setAdapter(friendAdapter);

        return view;
    }

}
